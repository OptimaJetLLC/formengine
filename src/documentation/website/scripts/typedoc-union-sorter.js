/**
 * Get a stable string representation of a type for sorting purposes.
 * This ensures consistent ordering across different builds.
 * @param {import('typedoc').SomeType} type type object from typedoc
 * @returns {string} canonical string representation
 */
function getTypeString(type) {
  if (!type) return ''

  // Use the same logic as original sorting: value || name || ''
  return type.value !== undefined ? String(type.value) : type.name || ''
}

/**
 * Recursively traverse and sort union types in any object.
 * Generic traversal that handles typedoc reflection structure.
 * @param {any} obj object to traverse
 * @param {Set<number|string>} visited set of visited object IDs
 */
function traverseAndSortUnions(obj, visited = new Set()) {
  // Base cases
  if (obj === null || obj === undefined) return
  if (typeof obj !== 'object' && typeof obj !== 'function') return

  // Handle circular references
  if (obj.id !== undefined) {
    if (visited.has(obj.id)) return
    visited.add(obj.id)
  } else if (obj._id !== undefined) {
    if (visited.has(obj._id)) return
    visited.add(obj._id)
  }

  // Special handling for union types
  if (obj.type === 'union' && Array.isArray(obj.types)) {
    // Sort union types alphabetically
    obj.types.sort((a, b) => {
      const aStr = getTypeString(a)
      const bStr = getTypeString(b)
      return aStr.localeCompare(bStr)
    })
  }

  // Recursively traverse all properties
  // We need to be careful about which properties we traverse
  // to avoid getting stuck in deep structures or built-in objects

  const props = Object.keys(obj)
  for (const prop of props) {
    // Skip properties that are likely to cause issues
    if (prop === 'parent' || prop === 'container' || prop === 'project') continue

    const value = obj[prop]

    // Skip primitives and functions (except we want to traverse function objects)
    if (value === null || value === undefined) continue
    if (typeof value === 'function') continue

    // Handle arrays
    if (Array.isArray(value)) {
      for (const item of value) {
        traverseAndSortUnions(item, visited)
      }
      continue
    }

    // Handle objects
    if (typeof value === 'object') {
      // Skip prototype chain and built-in objects
      if (value.constructor && value.constructor.name !== 'Object' && value.constructor.name !== 'Array') {
        // Still traverse typedoc-specific objects
        if (value.type !== undefined || value.kind !== undefined || value.name !== undefined) {
          traverseAndSortUnions(value, visited)
        }
      } else {
        traverseAndSortUnions(value, visited)
      }
    }
  }
}

/**
 * Main plugin that sorts union types in typedoc output.
 * @param {import('typedoc').Application} app typedoc application instance
 */
export function load(app) {
  app.converter.on('resolveEnd', context => {
    if (!context.project) return

    const visited = new Set()

    // Traverse the entire project
    traverseAndSortUnions(context.project, visited)

    // Also traverse all reflections individually
    if (context.project.reflections) {
      for (const reflection of Object.values(context.project.reflections)) {
        traverseAndSortUnions(reflection, visited)
      }
    }
  })
}
