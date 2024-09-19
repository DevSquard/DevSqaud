package com.devsquad.common.utils;

import java.util.Map;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "oauth2")
public class OAuth2Properties {
	private Map<String, Client> clients;
	
	public static class Client {
		private String clientId;
		private String clientSecret;
		private String redirectUri;
		private String tokenUri;
		private String userInfoRequestUri;
	}
}
