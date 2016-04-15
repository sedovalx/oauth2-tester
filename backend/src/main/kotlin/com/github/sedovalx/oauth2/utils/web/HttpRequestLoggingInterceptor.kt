package com.github.sedovalx.oauth2.utils.web

import org.slf4j.LoggerFactory
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter
import java.text.SimpleDateFormat
import java.util.*
import javax.servlet.http.Cookie
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

/**
 * Перехватчик http-запросов с функцией логгирования
 */
class HttpRequestLoggingInterceptor : HandlerInterceptorAdapter() {
    private val logger = LoggerFactory.getLogger(this.javaClass)
    private val startTimeHeader = "com.github.sedovalx.oauth2.startTime"

    override fun preHandle(request: HttpServletRequest?, response: HttpServletResponse?, handler: Any?): Boolean {
        request!!.setAttribute(startTimeHeader, System.currentTimeMillis())
        return super.preHandle(request, response, handler)
    }

    override fun afterCompletion(request: HttpServletRequest, response: HttpServletResponse, handler: Any?, ex: Exception?) {
        super.afterCompletion(request, response, handler, ex)

        val auditParameters = getAuditParameters(request, response)
        val additionalParameters = getAdditionalParameters(request)
        val extendedParameters = LinkedHashMap<String, String>()
        extendedParameters.putAll(auditParameters)
        extendedParameters.putAll(additionalParameters)
        auditParameters.putAll(additionalParameters)
        writeDebugMessage(extendedParameters)
    }

    private fun getFullUrl(request: HttpServletRequest): String {
        var url = request.method + " " + request.requestURL
        if (request.queryString != null) {
            url += "?" + request.queryString
        }
        return url
    }

    private fun getAuditParameters(request: HttpServletRequest, response: HttpServletResponse): MutableMap<String, String> {
        val startTime = request.getAttribute(startTimeHeader) as Long
        val endTime = System.currentTimeMillis()
        val elapsedTime = endTime - startTime

        val startDate = Date(startTime)
        val format = SimpleDateFormat("yyyy.MM.dd HH:mm:ss.SSS Z")

        val parameters = LinkedHashMap<String, String>()
        parameters.put("URL", getFullUrl(request))
        parameters.put("Remote host", String.format("%s [%s]", request.remoteHost, request.remoteAddr))
        parameters.put("Content length", request.contentLengthLong.toString())
        parameters.put("Start time", format.format(startDate))
        parameters.put("Elapsed time", elapsedTime.toString() + " ms")
        parameters.put("Response status", response.status.toString())
        return parameters
    }

    private fun getAdditionalParameters(request: HttpServletRequest): Map<String, String> {
        val parameters = LinkedHashMap<String, String>()
        parameters.put("Content type", request.contentType)
        parameters.put("Encoding", request.characterEncoding)
        parameters.put("Protocol", request.protocol)
        parameters.put("Headers", collectSomething(request.headerNames, { request.getHeader(it) }))
        parameters.put("Cookies", collectCookies(request.cookies))
        return parameters
    }

    private fun collectSomething(names: Enumeration<String>, getter: (String) -> String): String {
        var result = ""
        while (names.hasMoreElements()) {
            val name = names.nextElement()
            val value = getter(name)
            result += String.format("%s: %s, ", name, value)
        }

        return "{ ${result.trimEnd(',', ' ')} }"
    }

    private fun collectCookies(cookies: Array<Cookie>?): String {
        if (cookies == null) {
            return "[]"
        }

        val result = cookies
                .map { c -> "{ ${c.name}: ${c.value}, secure: ${c.secure}, httpOnly: ${c.isHttpOnly}, domain: ${c.domain}, maxAge: ${c.maxAge} }" }
                .reduce { sum, s -> "$sum, $s" }
                .trimEnd(',', ' ')
        return "[$result]"
    }

    private fun writeDebugMessage(parameters: Map<String, String>) {
        val message = stringifyMap(parameters)
        logger.debug(message)
    }

    private fun stringifyMap(parameters: Map<String, String>): String {
        val sb = StringBuilder("")
        for (name in parameters.keys) {
            sb.append(name).append(": ").append(parameters[name]).append(", ")
        }
        return sb.toString().trimEnd(',', ' ')
    }
}