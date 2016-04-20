package com.github.sedovalx.oauth2.base

import com.github.sedovalx.oauth2.TestConfig
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.test.context.ContextConfiguration
import org.springframework.test.context.web.WebAppConfiguration
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import org.springframework.web.context.WebApplicationContext
import spock.lang.Specification


/**
 * Author AlSedov on 20.04.2016
 */
@WebAppConfiguration
@ContextConfiguration(classes = [TestConfig])
abstract class MvcControllerBaseSpec extends Specification {
    @Autowired
    WebApplicationContext wac

    MockMvc mockMvc

    void setup() {
        doSetup()
    }

    protected void doSetup(){
        mockMvc = MockMvcBuilders.webAppContextSetup(wac).build()
    }
}