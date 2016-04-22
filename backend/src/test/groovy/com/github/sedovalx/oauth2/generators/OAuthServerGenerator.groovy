package com.github.sedovalx.oauth2.generators

import com.github.sedovalx.oauth2.domain.OAuthServer
import com.github.sedovalx.oauth2.storage.repos.OAuthServerRepo
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

/**
 * Created by Alexander 
 * on 22.04.2016.
 */
@Service
class OAuthServerGenerator {
    @Autowired
    private OAuthServerRepo repository

    static List<OAuthServer> generateServers(int count) {
        final servers = (1..count).collect {
            new OAuthServer(
                    name: UUID.randomUUID().toString(),
                    authEndpoint: UUID.randomUUID().toString(),
                    tokenEndpoint: UUID.randomUUID().toString(),
                    clientID: UUID.randomUUID().toString(),
                    clientSecret: UUID.randomUUID().toString()
            )
        }
        return servers
    }

    List<OAuthServer> save(List<OAuthServer> servers) {
        return servers.collect { repository.save(it) }
    }

    List<OAuthServer> createServers(int count) {
        return save(generateServers(count))
    }
}
