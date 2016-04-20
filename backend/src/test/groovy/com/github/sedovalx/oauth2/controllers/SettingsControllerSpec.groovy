package com.github.sedovalx.oauth2.controllers

import com.github.sedovalx.oauth2.base.MvcControllerBaseSpec

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath

/**
 * Created by Alexander 
 * on 21.04.2016.
 */
class SettingsControllerSpec extends MvcControllerBaseSpec {
    def "Should return flows and callbackUri"(){
        when: "try ask for settings"
        final actions = performGet('/api/settings')

        then: "returns 200, collection of flows and callbackUri"
        assertJsonIsOk(actions)
            .andExpect(jsonPath('$.flows').isArray())
            .andExpect(jsonPath('$.callbackUri').isString())
    }
}
