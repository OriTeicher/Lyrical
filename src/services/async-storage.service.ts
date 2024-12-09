export const storageService = {
  query,
  get,
  post,
  put,
  remove,
}

function query<T>(entityType: string, delay = 700): Promise<T[]> {
  const entities = JSON.parse(localStorage.getItem(entityType) || "[]") || []
  return new Promise((resolve) => setTimeout(() => resolve(entities), delay))
}

function get<T>(entityType: string, entityId: string): Promise<T> {
  return query<T>(entityType).then((entities) => {
    const entity = entities.find((entity: any) => entity._id === entityId)
    if (!entity) {
      throw new Error(
        `Get failed, cannot find entity with id: ${entityId} in: ${entityType}`
      )
    }
    return entity
  })
}

function post<T>(
  entityType: string,
  newEntity: T
): Promise<T & { _id: string }> {
  const entityWithId = { ...newEntity, _id: _makeId() }
  return query<T>(entityType).then((entities) => {
    entities.push(entityWithId)
    _save(entityType, entities)
    return entityWithId
  })
}

function put<T extends { _id: string }>(
  entityType: string,
  updatedEntity: T
): Promise<T> {
  return query<T>(entityType).then((entities) => {
    const idx = entities.findIndex(
      (entity: any) => entity._id === updatedEntity._id
    )
    if (idx < 0) {
      throw new Error(
        `Update failed, cannot find entity with id: ${updatedEntity._id} in: ${entityType}`
      )
    }
    entities.splice(idx, 1, updatedEntity)
    _save(entityType, entities)
    return updatedEntity
  })
}

function remove(entityType: string, entityId: string): Promise<void> {
  return query<any>(entityType).then((entities) => {
    const idx = entities.findIndex((entity: any) => entity._id === entityId)
    if (idx < 0) {
      throw new Error(
        `Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`
      )
    }
    entities.splice(idx, 1)
    _save(entityType, entities)
  })
}

function _save(entityType: string, entities: any[]): void {
  localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5): string {
  let text = ""
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}
