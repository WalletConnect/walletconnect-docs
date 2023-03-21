# Auth API Overview

## Description

Auth API provides a simple and lean interface to enable applications to authenticate wallet users to login/signin into applications with their wallets by automatically signing an authentication message.

## Context

Auth API would be present in wallets similarly to Sign API where users could establish a connection with a website or app to connect their wallet to sign. However Auth API would be focused exclusively on automatically signing an authentication message on connection request.

Contrary to Sign API where you would establish a connection to expose accounts without knowing if the wallet actually controlled these accounts. Auth API would provide a signed message with pre-defined parameters from the app request to authenticate the wallet user.

This API would be used for wallet users to login in a single step into existing websites or applications that would normally require an email and password login or a social login such as Facebook, Google, etc

Auth API is a one-click passwordless authentication provider for any website or application.

## Goals

A user can login or sign-in into any website or application with their blockchain account.

An app does not need to maintain a persisted connection with the wallet once authenticated.

A wallet can evaluate all auth parameters requested to format the message independently.

An authentication message can be used to access resources through OAuth 2.0 or OpenID.
