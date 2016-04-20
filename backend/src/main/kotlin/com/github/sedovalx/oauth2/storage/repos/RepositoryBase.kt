package com.github.sedovalx.oauth2.storage.repos

/**
 * Created by Alexander
 * on 18.04.2016.
 */

interface RepositoryBase<Entity, Id> {
    fun getAll(limit: Int? = null): List<Entity>
    fun save(entity: Entity): Entity
    fun delete(id: Id): Boolean
}