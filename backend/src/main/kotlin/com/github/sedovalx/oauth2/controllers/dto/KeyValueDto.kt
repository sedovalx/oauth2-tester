package com.github.sedovalx.oauth2.controllers.dto

import javax.validation.constraints.NotNull

/**
 * Created by Alexander
 * on 26.04.2016.
 */
data class KeyValueDto(
        @NotNull
        val key: String = "",
        @NotNull
        val value: String? = null
)