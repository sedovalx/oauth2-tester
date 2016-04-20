package com.github.sedovalx.oauth2.controllers

import com.github.sedovalx.oauth2.base.MvcControllerBaseSpec
/**
 * Author AlSedov on 20.04.2016
 */
class OAuthServerControllerSpec extends MvcControllerBaseSpec {
    def "Should return empty json array if no servers present"() {
        given: "no servers in the storage"
        when: "try query servers without limit"
        then: "returns 200 and empty result"
    }
}