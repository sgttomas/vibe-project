'use client'

import React from 'react'

interface CellWarningsProps {
  warnings?: string[]
  className?: string
}

export function CellWarnings({ warnings, className }: CellWarningsProps) {
  if (!warnings?.length) return null

  return (
    <div className={`bg-yellow-50 border border-yellow-200 rounded-lg p-3 ${className || ''}`}>
      <div className="flex items-start space-x-2">
        <div className="flex-shrink-0">
          <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-yellow-800">
            Cell warnings ({warnings.length})
          </p>
          <div className="mt-1 text-sm text-yellow-700">
            {warnings.map((warning, index) => (
              <div key={index} className="flex items-start space-x-1">
                <span className="text-yellow-400">•</span>
                <span>{warning}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}