package com.github.sedovalx.oauth2.controllers.dto

/**
 * Created by Alexander
 * on 21.04.2016.
 */
data class SettingsDto(val flows: List<FlowDto>, val callbackUri: String)