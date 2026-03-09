# SSEMMI Api Documentation v0.1.0

The documentation for the SSEMMI open API project.

- [PasswordReset](#passwordreset)
	- [Send email](#send-email)
	- [Submit password](#submit-password)
	- [Verify token](#verify-token)
	
- [Sightings](#sightings)
	- [Delete specific sightings](#delete-specific-sightings)
	- [Contribute sightings](#contribute-sightings)
	- [Retrieve current sightings](#retrieve-current-sightings) (without token)
	- [Retrieve current sightings](#retrieve-current-sightings) (with token)
	- [Retrieve specific sightings](#retrieve-specific-sightings)
	- [Retrieve sightings marked as trusted](#retrieve-sightings-marked-as-trusted)
	
- [User](#user)
	- [Create/update user profile](#create/update-user-profile)
	- [Create user token](#create-user-token)
	- [Delete token](#delete-token)
	- [Get user tokens](#get-user-tokens)
	- [Retrieve current user](#retrieve-current-user)
	- [Retrieve user](#retrieve-user)
	- [Update password](#update-password)
	- [Update user](#update-user)
	


# PasswordReset

## Send email



	POST https://acartia.io/api/v1/password-resets


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| email			| String			|  <p>Email address to receive the password reset token.</p>							|
| link			| String			|  <p>Link to redirect user.</p>							|

## Submit password



	PUT https://acartia.io/api/v1/password-resets/:token


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| password			| String			|  <p>User's new password.</p>							|

## Verify token



	GET https://acartia.io/api/v1/password-resets/:token


# Sightings

## Delete specific sightings



	DELETE https://acartia.io/api/v1/sightings/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Contribute sightings



	POST https://acartia.io/api/v1/sightings


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve current sightings (without token)

Current sightings include any observations made in the most recent 7 days.

	GET https://acartia.io/api/v1/sightings/current


## Retrieve current sightings (with token)

Current sightings include any observations made in the most recent 7 days.

	GET https://acartia.io/api/v1/sightings


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve specific sightings



	GET https://acartia.io/api/v1/sightings/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve sightings marked as trusted



	GET https://acartia.io/api/v1/sightings/trusted


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

# User

## Create/update user profile



	POST https://acartia.io/api/v1/users/:id/profile


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|
| name			| String			| **optional** <p>Contributor name.</p>							|
| website			| String			| **optional** <p>Contributor website.</p>							|
| logoFile			| String			| **optional** <p>Base64 of contributor logo.</p>							|
| id			| Number			|  <p>user id</p>							|

## Create user token



	POST https://acartia.io/api/v1/users/:id/tokens


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|
| name			| String			| **optional** <p>name of token.</p>							|
| id			| Number			|  <p>user id</p>							|

## Delete token



	DELETE https://acartia.io/api/v1/users/tokens/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token</p>							|
| id			| String			|  <p>user token id</p>							|

## Get user tokens



	GET https://acartia.io/api/v1/users/:id/tokens


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| Number			|  <p>user id</p>							|

## Retrieve current user



	GET https://acartia.io/api/v1/users/me


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve user



	GET https://acartia.io/api/v1/users/:id


## Update password



	PUT https://acartia.io/api/v1/users/:id/password

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| password			| String			|  <p>User's new password.</p>							|

## Update user



	PUT https://acartia.io/api/v1/users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|
| isApproved			| String			| **optional** <p>if the user is approved by admin.</p>							|


