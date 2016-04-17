package com.github.sedovalx.oauth2.repos

import com.github.sedovalx.oauth2.domain.OAuthServer
import com.github.sedovalx.oauth2.dto.OAuthServerDto
import org.springframework.stereotype.Component
import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.atomic.AtomicLong

/**
 * Created by Alexander
 * on 18.04.2016.
 */
interface OAuthServerRepo {
    fun get(limit: Int?): List<OAuthServer>
    fun create(dto: OAuthServerDto): OAuthServer
    fun delete(id: Long): Boolean
}

@Component
class OAuthServerRepoImpl: OAuthServerRepo {
    override fun delete(id: Long): Boolean {
        return items.remove(id) != null
    }

    private val items = ConcurrentHashMap<Long, OAuthServer>()
    private val counter = AtomicLong(0)

    override fun get(limit: Int?): List<OAuthServer> {
        val values = items.toSortedMap().values
        return (if (limit != null) values.take(limit) else values).toList();
    }

    override fun create(dto: OAuthServerDto): OAuthServer {
        val id = counter.andIncrement
        val entity = OAuthServer.fromDto(id, dto)
        items.put(id, entity)
        return entity
    }
}