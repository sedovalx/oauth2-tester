package com.github.sedovalx.oauth2.base

import com.github.sedovalx.oauth2.TestConfig
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.MediaType
import org.springframework.test.context.ContextConfiguration
import org.springframework.test.context.web.WebAppConfiguration
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.ResultActions
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import org.springframework.web.context.WebApplicationContext
import spock.lang.Specification

import java.util.function.Function

import static org.hamcrest.Matchers.hasSize
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status


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

    protected ResultActions performGet(String url, Map<String, Object[]> headers = null) {
        def requestBuilder = MockMvcRequestBuilders.get(url)
        if (headers != null) {
            for(def header: headers) {
                requestBuilder = requestBuilder.header(header.key, header.value)
            }
        }
        mockMvc.perform(requestBuilder)
    }

    protected def performJsonPost(String url, String json) {
        mockMvc.perform(post(url).contentType(MediaType.APPLICATION_JSON).content(json))
    }

    protected def performDelete(String url) {
        mockMvc.perform(delete(url))
    }

    protected static ResultActions assertJsonIsNotFound(ResultActions actions){
        return actions.andDo(print())
                .andExpect(status().isNotFound())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
    }

    protected static ResultActions assertJsonIsOk(ResultActions actions){
        return actions.andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
    }

    protected static <T> ResultActions assertJsonListEqual(ResultActions actions, List<T> expected, String jsonPathToList, Function<T, String> jsonPathFunc) {
        actions = actions
            .andExpect(jsonPath(jsonPathToList).isArray())
            .andExpect(jsonPath(jsonPathToList, hasSize(expected.size())))

        expected.forEach {
            def path = jsonPathToList + jsonPathFunc.apply(it)
            actions = actions.andExpect(jsonPath(path).exists())
        }
        return actions
    }
}