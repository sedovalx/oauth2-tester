package com.github.sedovalx.oauth2.controllers

import com.github.sedovalx.oauth2.base.MvcControllerBaseSpec
import com.github.sedovalx.oauth2.domain.OAuthServer
import com.github.sedovalx.oauth2.storage.repos.OAuthServerRepo
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.test.web.servlet.ResultActions

import static org.hamcrest.Matchers.hasSize
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath

/**
 * Author AlSedov on 20.04.2016
 */
class OAuthServerControllerSpec extends MvcControllerBaseSpec {
    @Autowired
    private OAuthServerRepo repository

    void cleanup() {
        repository.getAll(null).forEach {
            repository.delete(it.name)
        }
    }

    def "Should return empty json array if no servers present"() {
        given: "no servers in the storage"

        when: "try query servers without limit"
        final actions = performGet('/api/servers')

        then: "returns 200 and empty result"
        assertJsonIsOk(actions)
            .andExpect(jsonPath('$.items').isArray())
            .andExpect(jsonPath('$.items', hasSize(0)))
    }

    def "Should return correct list of server info"(){
        given: "N servers in the storage"
        final n = 10
        final expected = generateServers(n)

        when: "try query servers without limit"
        final actions = performGet('/api/servers')

        then: "returns 200 and all servers beyond default limit (100)"
        assertJsonIsOk(actions)
            .andExpect(jsonPath('$.items').isArray())
            .andExpect(jsonPath('$.items', hasSize(n)))
        assertJsonServerList(actions, expected)
    }

    def "Should return list of servers with respect to the limit"(){
        given: "10 servers in the storage"
        generateServers(10)

        when: "try query servers with limit of 5"
        final actions = performGet('/api/servers?limit=5')

        then: "returns 200 and 5 server infos"
        assertJsonIsOk(actions)
                .andExpect(jsonPath('$.items', hasSize(5)))
    }

    private static ResultActions assertJsonServerList(ResultActions actions, List<OAuthServer> expected) {
        return assertJsonListEqual(actions, expected, '$.items', {
            "[?(@.name == '${it.name}' " +
                    "&& @.authEndpoint == '${it.authEndpoint}' " +
                    "&& @.tokenEndpoint == '${it.tokenEndpoint}' " +
                    "&& @.clientID == '${it.clientID}' " +
                    "&& @.clientSecret == '${it.clientSecret}')]"
        })
    }

    private List<OAuthServer> generateServers(int count) {
        final servers = (1..count).collect {
            new OAuthServer(
                    name: UUID.randomUUID().toString(),
                    authEndpoint: UUID.randomUUID().toString(),
                    tokenEndpoint: UUID.randomUUID().toString(),
                    clientID: UUID.randomUUID().toString(),
                    clientSecret: UUID.randomUUID().toString()
            )
        }
        servers.forEach { repository.save(it) }
        return servers
    }
}