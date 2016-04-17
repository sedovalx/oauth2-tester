package com.github.sedovalx.oauth2.utils.web

import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity

object Response {
    fun buildStringResponse(status: HttpStatus, contentType: MediaType, content: String?): ResponseEntity<String?> {
        val headers = HttpHeaders()
        headers.contentType = contentType
        return ResponseEntity(content, headers, status)
    }

    @JvmOverloads
    fun buildJsonOK(jsonContent: String? = null): ResponseEntity<String?> {
        return buildStringResponse(HttpStatus.OK, MediaType.APPLICATION_JSON, jsonContent)
    }

    fun buildJsonStatus(status: HttpStatus): ResponseEntity<String?> {
        return buildStringResponse(status, MediaType.APPLICATION_JSON, null)
    }

    fun <T> buildObjectResponse(status: HttpStatus, contentType: MediaType, content: T): ResponseEntity<T> {
        val headers = HttpHeaders()
        headers.contentType = contentType
        return ResponseEntity(content, headers, status)
    }

    fun <T> buildJsonObjectOK(content: T): ResponseEntity<T> {
        return buildJsonObject(HttpStatus.OK, content)
    }

    fun <T> buildJsonObject(status: HttpStatus, content: T): ResponseEntity<T> {
        return buildObjectResponse(status, MediaType.APPLICATION_JSON, content)
    }

    fun buildJsonResponse(status: HttpStatus, jsonContent: String): ResponseEntity<String?> {
        return buildStringResponse(status, MediaType.APPLICATION_JSON, jsonContent)
    }
}