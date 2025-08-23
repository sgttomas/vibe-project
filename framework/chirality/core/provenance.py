"""
Provenance tracking for CF14 operations.

Maintains audit trail and lineage for all semantic transformations.
"""

import hashlib
import json
import unicodedata
import re
from typing import Dict, Any, List, Optional
from datetime import datetime


def canonical_value(value: Any) -> str:
    """
    Convert any value to canonical string representation for consistent hashing.
    
    Args:
        value: Value to canonicalize
    
    Returns:
        Canonical string representation
    """
    if isinstance(value, str):
        return _normalize(value)
    elif isinstance(value, (dict, list)):
        return json.dumps(value, sort_keys=True, separators=(",", ":"))
    elif value is None:
        return ""
    else:
        return str(value)


def _normalize(s: str) -> str:
    """Normalize string for consistent hashing (from semmul_cf14.py)."""
    if s is None:
        return ""
    s = unicodedata.normalize("NFKC", str(s))
    s = re.sub(r"\s+", " ", s).strip()
    return s


def prompt_hash(system: str, user: str, context: Dict[str, Any]) -> str:
    """
    Generate deterministic hash for prompt + context.
    
    Args:
        system: System prompt
        user: User prompt
        context: Context dictionary
    
    Returns:
        SHA256 hash
    """
    h = hashlib.sha256()
    h.update(canonical_value(system).encode("utf-8"))
    h.update(b"\n\n")
    h.update(canonical_value(user).encode("utf-8"))
    h.update(b"\n\n")
    h.update(json.dumps(context, sort_keys=True).encode("utf-8"))
    return h.hexdigest()


def content_hash(data: Any) -> str:
    """
    Generate hash for content (cells, matrices, etc.).
    
    Args:
        data: Data to hash
    
    Returns:
        SHA256 hash (16 chars)
    """
    if isinstance(data, list):
        # For cells list, sort by position for determinism
        sorted_data = sorted(data, key=lambda x: (getattr(x, 'row', 0), getattr(x, 'col', 0)))
        content = json.dumps([canonical_value(getattr(x, 'value', getattr(x, 'content', {}).get('text', str(x)))) for x in sorted_data], sort_keys=True)
    else:
        content = canonical_value(data)
    
    return hashlib.sha256(content.encode()).hexdigest()[:16]


class ProvenanceTracker:
    """Track provenance for semantic operations."""
    
    def __init__(self):
        """Initialize provenance tracker."""
        self.operations = []
        self.lineage = {}
    
    def track_operation(self,
                       operation_type: str,
                       inputs: List[str],
                       outputs: List[str],
                       metadata: Optional[Dict[str, Any]] = None) -> str:
        """
        Track a semantic operation.
        
        Args:
            operation_type: Type of operation
            inputs: Input IDs
            outputs: Output IDs
            metadata: Additional metadata
        
        Returns:
            Operation ID
        """
        operation = {
            "id": self._generate_operation_id(operation_type, inputs),
            "type": operation_type,
            "inputs": inputs,
            "outputs": outputs,
            "timestamp": datetime.utcnow().isoformat(),
            "metadata": metadata or {}
        }
        
        self.operations.append(operation)
        
        # Update lineage
        for output_id in outputs:
            self.lineage[output_id] = {
                "operation": operation["id"],
                "sources": inputs,
                "timestamp": operation["timestamp"]
            }
        
        return operation["id"]
    
    def get_lineage(self, entity_id: str, depth: int = 1) -> Dict[str, Any]:
        """
        Get lineage for an entity.
        
        Args:
            entity_id: Entity ID to trace
            depth: How many levels to trace back
        
        Returns:
            Lineage tree
        """
        if entity_id not in self.lineage:
            return {"id": entity_id, "lineage": None}
        
        lineage = self.lineage[entity_id].copy()
        
        if depth > 1 and lineage.get("sources"):
            lineage["sources"] = [
                self.get_lineage(source_id, depth - 1)
                for source_id in lineage["sources"]
            ]
        
        return {
            "id": entity_id,
            "lineage": lineage
        }
    
    def generate_provenance_hash(self, data: Dict[str, Any]) -> str:
        """
        Generate deterministic hash for provenance data.
        
        Args:
            data: Provenance data
        
        Returns:
            SHA256 hash
        """
        sorted_data = json.dumps(data, sort_keys=True)
        return hashlib.sha256(sorted_data.encode()).hexdigest()
    
    def _generate_operation_id(self, operation_type: str, inputs: List[str]) -> str:
        """Generate deterministic operation ID."""
        content = f"{operation_type}:{':'.join(sorted(inputs))}:{datetime.utcnow().isoformat()}"
        return f"op_{hashlib.sha256(content.encode()).hexdigest()[:12]}"
    
    def export_provenance(self) -> Dict[str, Any]:
        """
        Export full provenance record.
        
        Returns:
            Complete provenance data
        """
        return {
            "operations": self.operations,
            "lineage": self.lineage,
            "exported_at": datetime.utcnow().isoformat()
        }


def create_cell_provenance(operation: str,
                          sources: List[str],
                          metadata: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    """
    Create provenance record for a cell.
    
    Args:
        operation: Operation that created the cell
        sources: Source IDs
        metadata: Additional metadata
    
    Returns:
        Provenance dictionary
    """
    provenance = {
        "operation": operation,
        "sources": sources,
        "timestamp": datetime.utcnow().isoformat()
    }
    
    if metadata:
        provenance["metadata"] = metadata
    
    # Generate hash for integrity
    provenance["hash"] = hashlib.sha256(
        json.dumps(provenance, sort_keys=True).encode()
    ).hexdigest()[:16]
    
    return provenance


def verify_provenance_integrity(provenance: Dict[str, Any]) -> bool:
    """
    Verify provenance record integrity.
    
    Args:
        provenance: Provenance record to verify
    
    Returns:
        True if integrity is valid
    """
    if "hash" not in provenance:
        return False
    
    stored_hash = provenance["hash"]
    
    # Recalculate hash
    prov_copy = provenance.copy()
    del prov_copy["hash"]
    
    calculated_hash = hashlib.sha256(
        json.dumps(prov_copy, sort_keys=True).encode()
    ).hexdigest()[:16]
    
    return stored_hash == calculated_hash


def merge_provenance(prov1: Dict[str, Any], prov2: Dict[str, Any]) -> Dict[str, Any]:
    """
    Merge two provenance records.
    
    Args:
        prov1: First provenance record
        prov2: Second provenance record
    
    Returns:
        Merged provenance
    """
    merged_sources = list(set(
        prov1.get("sources", []) + prov2.get("sources", [])
    ))
    
    merged = {
        "operation": "merge",
        "sources": merged_sources,
        "timestamp": datetime.utcnow().isoformat(),
        "parent_operations": [
            prov1.get("operation"),
            prov2.get("operation")
        ]
    }
    
    # Include metadata from both
    metadata = {}
    if "metadata" in prov1:
        metadata.update(prov1["metadata"])
    if "metadata" in prov2:
        metadata.update(prov2["metadata"])
    
    if metadata:
        merged["metadata"] = metadata
    
    # Generate new hash
    merged["hash"] = hashlib.sha256(
        json.dumps(merged, sort_keys=True).encode()
    ).hexdigest()[:16]
    
    return merged