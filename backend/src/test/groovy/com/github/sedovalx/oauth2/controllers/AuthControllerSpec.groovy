package com.github.sedovalx.oauth2.controllers

import com.fasterxml.jackson.databind.ObjectMapper
import com.github.sedovalx.oauth2.base.MvcControllerBaseSpec
import com.github.sedovalx.oauth2.domain.OAuthServer
import org.springframework.http.MediaType
import spock.lang.Unroll
import com.github.sedovalx.oauth2.generators.OAuthServerGenerator
import com.github.sedovalx.oauth2.storage.repos.OAuthServerRepo
import org.springframework.beans.factory.annotation.Autowired

import static org.hamcrest.Matchers.is
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

/**
 * Created by Alexander 
 * on 22.04.2016.
 */
class AuthControllerSpec extends MvcControllerBaseSpec {
    @Autowired
    private OAuthServerRepo repository
    @Autowired
    private OAuthServerGenerator serverGenerator

    private final jacksonMapper = new ObjectMapper()

    void cleanup() {
        repository.getAll(null).forEach {
            repository.delete(it.name)
        }
    }

    private class CodeUriParams {
        String serverName
        String scope
        String state
    }

    private static OAuthServer srv = new OAuthServer(
            name: 'Some name with spaces@#$#!@',
            authEndpoint: "https://name:1222/${UUID.randomUUID()}/auth",
            tokenEndpoint: "https://name:1222/${UUID.randomUUID()}/token",
            clientID: UUID.randomUUID().toString() + ' asd @!@#!%$#',
            clientSecret: UUID.randomUUID().toString() + ' *&#$%@#$@'
    )
    private static randomSrvName = UUID.randomUUID().toString()
    private static randomState = """{ "param": "${UUID.randomUUID()}" }"""

    private static encodedState = URLEncoder.encode(randomState, 'UTF-8')
    private static expectedScope = "${UUID.randomUUID()} this it the scopes ${UUID.randomUUID()}"
    private static encodedScopes = URLEncoder.encode(expectedScope, 'UTF-8')
    private static expectedCodeUri = "${srv.authEndpoint}?response_type=code&client_id=${URLEncoder.encode(srv.clientID, 'UTF-8')}"

    @Unroll
    def "Should return build correct uri for code flow"(){
        given: "one server in the storage"
        serverGenerator.save([srv])

        when: "query uri with params"
        final params = new CodeUriParams(
                serverName: serverName,
                scope: scopes,
                state: state
        )
        final actions = performJsonPost("/api/auth/build-uri/code", jacksonMapper.writeValueAsString(params))

        then: "uri should reflect params"
        actions.andDo(print())
        actions.andExpect(status().is(responseStatus))
        actions.andExpect(content().contentType(MediaType.APPLICATION_JSON))
        actions.andExpect(jsonPath('$.success', is(success)))
        success ? actions.andExpect(jsonPath('$.error').doesNotExist()) : actions.andExpect(jsonPath('$.error', is(error.toString())))
        success ? actions.andExpect(jsonPath('$.uri', is(uri.toString()))) : actions.andExpect(jsonPath('$.uri').doesNotExist())

        where:
        serverName      | scopes             | state         | responseStatus    | success   | error                                                 | uri
        randomSrvName   | expectedScope      | randomState   | 404               | false     | "OAuth server with name [$randomSrvName] not found"   | null
        null            | expectedScope      | randomState   | 400               | false     | 'OAuth server name expected'                          | null
        srv.name        | null               | null          | 200               | true      | null                                                  | expectedCodeUri
        srv.name        | null               | randomState   | 200               | true      | null                                                  | "$expectedCodeUri&state=$encodedState"
        srv.name        | expectedScope      | null          | 200               | true      | null                                                  | "$expectedCodeUri&scope=$encodedScopes"
        srv.name        | expectedScope      | randomState   | 200               | true      | null                                                  | "$expectedCodeUri&scope=$encodedScopes&state=$encodedState"
    }
}