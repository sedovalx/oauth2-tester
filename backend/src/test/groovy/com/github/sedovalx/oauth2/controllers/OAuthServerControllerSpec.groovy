package com.github.sedovalx.oauth2.controllers

import com.fasterxml.jackson.databind.ObjectMapper
import com.github.sedovalx.oauth2.base.MvcControllerBaseSpec
import com.github.sedovalx.oauth2.domain.OAuthServer
import com.github.sedovalx.oauth2.generators.OAuthServerGenerator
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
    @Autowired
    private OAuthServerGenerator generator

    private final jacksonMapper = new ObjectMapper()

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
        final expected = generator.createServers(n)

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
        generator.createServers(10)

        when: "try query servers with limit of 5"
        final actions = performGet('/api/servers?limit=5')

        then: "returns 200 and 5 server infos"
        assertJsonIsOk(actions)
                .andExpect(jsonPath('$.items', hasSize(5)))
    }

    def "Should save a server info"() {
        given: "2 servers in the storage"
        final serverCount = 2
        generator.createServers(serverCount)

        when: "save new server info"
        final expected = generator.generateServers(1).find()
        final actions = performJsonPost('/api/servers', jacksonMapper.writeValueAsString(expected))

        then: "returns 200 and the server appears in the storage"
        assertJsonIsOk(actions)
        final items = repository.getAll(null)
        items.size() == serverCount + 1
        final actual = items.find { it.name == expected.name }
        actual != null
        actual.authEndpoint == expected.authEndpoint
        actual.tokenEndpoint == expected.tokenEndpoint
        actual.clientID == expected.clientID
        actual.clientSecret == expected.clientSecret
    }

    def "Should update existing server"(){
        given: "3 servers in the storage"
        final serverCount = 3
        final name = generator.createServers(serverCount).get(2).name

        when: "try save server info for existing name"
        final expected = generator.generateServers(1).find()
        expected.name = name
        final actions = performJsonPost('/api/servers', jacksonMapper.writeValueAsString(expected))

        then: "returns 200 and updates existing server in the storage"
        assertJsonIsOk(actions)
        final items = repository.getAll(null)
        items.size() == serverCount
        final actual = items.find { it.name == expected.name }
        actual != null
        actual.authEndpoint == expected.authEndpoint
        actual.tokenEndpoint == expected.tokenEndpoint
        actual.clientID == expected.clientID
        actual.clientSecret == expected.clientSecret
    }

    def "Should delete existing server"(){
        given: "3 servers in the storage"
        final serverCount = 3
        final name = generator.createServers(serverCount).get(2).name

        when: "try to delete server"
        final actions = performDelete("/api/servers/$name")

        then: "returns 200 and the server is deleted"
        assertJsonIsOk(actions)
        final items = repository.getAll(null)
        items.size() == serverCount - 1
        items.find { it.name == name } == null
    }

    def "Should return 404 if can't find server to delete"(){
        given: "3 servers in the storage"
        final serverCount = 3
        generator.createServers(serverCount)

        when: "try to delete non existing server"
        final actions = performDelete("/api/servers/${UUID.randomUUID()}")

        then: "returns 404 and no servers are deleted"
        assertJsonIsNotFound(actions)
        repository.getAll(null).size() == serverCount
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
}

