package com.github.sedovalx.oauth2.storage.repos

import com.github.sedovalx.oauth2.domain.OAuthServer
import org.mongodb.morphia.Datastore
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

@Component
class OAuthServerRepoImpl: OAuthServerRepo {

    @Autowired
    private lateinit var datastore: Datastore

    override fun save(entity: OAuthServer): OAuthServer {
        datastore.save(entity)
        return entity
    }

    override fun delete(id: String): Boolean {
        val query = datastore.createQuery(OAuthServer::class.java).filter("name =", id)
        val result = datastore.delete(query)
        return result.n > 0
    }

    override fun getAll(limit: Int?): List<OAuthServer> {
        var query = datastore.createQuery(OAuthServer::class.java)
        if (limit != null){
            query = query.limit(limit)
        }
        return query.asList()
    }

}