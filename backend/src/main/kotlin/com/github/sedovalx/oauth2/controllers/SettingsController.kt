package com.github.sedovalx.oauth2.controllers

import com.github.sedovalx.oauth2.controllers.dto.FlowDto
import com.github.sedovalx.oauth2.controllers.dto.SettingsDto
import com.github.sedovalx.oauth2.domain.FlowCode.*
import com.github.sedovalx.oauth2.utils.web.Response
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

/**
 * Created by Alexander
 * on 21.04.2016.
 */
@RestController
@RequestMapping(value = "**/api/settings")
class SettingsController: ControllerBase() {
    @RequestMapping(value = "", method = arrayOf(RequestMethod.GET))
    fun getAll(): ResponseEntity<SettingsDto> {
        imitateTimeouts()

        val flows = listOf(
                FlowDto(code = CODE_FLOW.toString(), desc = "Authorization Code"),
                FlowDto(code = RESOURCE_FLOW.toString(), desc = "Resource Owner Password Credentials"),
                FlowDto(code = CLIENT_FLOW.toString(), desc = "Client Credentials")
        )
        return Response.buildJsonObjectOK(SettingsDto(flows, callbackUri = "/"))
    }
}