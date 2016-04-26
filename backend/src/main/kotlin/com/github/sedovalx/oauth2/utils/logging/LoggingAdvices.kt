package com.github.sedovalx.oauth2.utils.logging

import org.apache.commons.lang3.StringUtils
import org.aspectj.lang.ProceedingJoinPoint
import org.aspectj.lang.reflect.MethodSignature
import org.slf4j.LoggerFactory
import org.slf4j.MDC
import java.io.Closeable
import java.io.IOException
import java.lang.reflect.Method

class LoggingAdvices {

    private val logger = LoggerFactory.getLogger(this.javaClass)

    private fun buildClassMethodArgsString(message:String, arguments:Array<Any>):String {
        val sb = StringBuilder(message).append("(")
        for (i in arguments.indices)
        {
            sb.append(cutParameterLength(arguments[i]))
            if (i < arguments.size - 1)
            {
                sb.append(", ")
            }
        }
        return sb.append(")").toString()
    }

    private inner class MDCContext(
            val file: Closeable? = null,
            val className: Closeable? = null,
            val methodName: Closeable? = null,
            val lineNumber: Closeable? = null): Closeable {

        override fun close() {
            file?.close()
            className?.close()
            methodName?.close()
            lineNumber?.close()
        }
    }

    private fun createMDCContext(clazz: Class<*>, method: Method): MDCContext {
        return MDCContext(
                MDC.putCloseable(LoggableConsts.FILE_NAME, ""),
                MDC.putCloseable(LoggableConsts.CLASS_NAME, clazz.simpleName),
                MDC.putCloseable(LoggableConsts.METHOD_NAME, method.name),
                MDC.putCloseable(LoggableConsts.LINE_NUMBER, ""))
    }

    private fun createMDCContext(e: Exception):MDCContext {
        val stackTrace = e.stackTrace
        if (stackTrace.size > 0)
        {
            val stackTraceElement = stackTrace[0]
            return MDCContext(
                    MDC.putCloseable(LoggableConsts.FILE_NAME, stackTraceElement.fileName),
                    MDC.putCloseable(LoggableConsts.CLASS_NAME, stackTraceElement.javaClass.simpleName),
                    MDC.putCloseable(LoggableConsts.METHOD_NAME, stackTraceElement.methodName),
                    MDC.putCloseable(LoggableConsts.LINE_NUMBER, (stackTraceElement.lineNumber).toString()))
        }
        return MDCContext()
    }

    private fun logDebug(message:String, clazz:Class<*>, method:Method) {
        log({ logger.debug(message) }, clazz, method)
    }

    private fun logError(e:Exception, annotation:Loggable) {
        try
        {
            createMDCContext(e).use({ ignored->
                if (annotation.printExceptionStackTrace) {
                    logger.error(e.message, e)
                } else {
                    logger.error(e.message)
                }
            })
        }
        catch (e: IOException) {
            logger.warn("Error closing MDCContext", e)
        }
    }

    private fun log(action: () -> Unit, clazz:Class<*>, method:Method) {
        try {
            createMDCContext(clazz, method).use {
                action()
            }
        }
        catch (e: IOException) {
            logger.warn("Error closing MDCContext", e)
        }
    }

    fun aroundLoggingWithArgumentsAdvice(joinPoint: ProceedingJoinPoint, annotation: Loggable): Any {
        val method = MethodSignature::class.java.cast(joinPoint.signature).method
        val clazz = if (joinPoint.target != null)
            joinPoint.target.javaClass
        else
            method.declaringClass
        val className = clazz.name
        val methodName = method.name
        val enteringMessage = buildClassMethodArgsString("Entering: $className.$methodName", joinPoint.args)
        logDebug(enteringMessage, clazz, method)
        if (annotation.message.length > 0)
        {
            log({ logger.info(annotation.message) }, clazz, method)
        }
        val startTime = System.currentTimeMillis()
        var result: Any = "an error"
        try
        {
            result = joinPoint.proceed()
            return result
        }
        catch (e:Exception) {
            logError(e, annotation)
            throw e
        }
        finally
        {
            val endTime = System.currentTimeMillis()
            logDebug(String.format("Leaving (%s ms): %s returning %s",
                    endTime - startTime,
                    buildClassMethodArgsString(className + "." + methodName, joinPoint.getArgs()),
                    cutParameterLength(result)), clazz, method)
        }
    }
    private fun cutParameterLength(param: Any?): String? {
        if (param == null) {
            return null
        }

        val str = param.toString()
        if (str.length <= 1000) {
            return str
        }
        return StringUtils.left(param.toString(), 1000) + "... (omitted)"
    }
}