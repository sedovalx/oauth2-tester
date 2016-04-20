package com.github.sedovalx.oauth2.mock

import com.github.sedovalx.oauth2.domain.OAuthServer
import com.github.sedovalx.oauth2.storage.repos.OAuthServerRepo
import org.jetbrains.annotations.Nullable

import java.util.concurrent.ConcurrentHashMap

/**
 * Author AlSedov on 20.04.2016
 */
class OAuthServerRepoMock implements OAuthServerRepo {

    private def items = new ConcurrentHashMap<String, OAuthServer>()

    @Override
    List<OAuthServer> getAll(@Nullable Integer limit) {
        def ordered = items.sort { it.key }.values().toList()
        return limit != null ? ordered.take(limit) : ordered
    }

    @Override
    OAuthServer save(OAuthServer entity) {
        items[entity.name] = entity
    }

    @Override
    boolean delete(String name) {
        items.remove(name)
    }
}
