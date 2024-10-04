using Ramsha.FileStorage.Settings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Ramsha.FileStorage;
public static class Extensions
{
	public static string GoogleCredentialsAsJson(this GoogleCredentialsModel credentials)
	{
		var credentialsJson = new
		{
			type = credentials.Type,
			project_id = credentials.ProjectId,
			private_key_id = credentials.PrivateKeyId,
			private_key = credentials.PrivateKey,
			client_email = credentials.ClientEmail,
			client_id = credentials.ClientId,
			auth_uri = credentials.AuthUri,
			token_uri = credentials.TokenUri,
			auth_provider_x509_cert_url = credentials.AuthProviderX509CertUrl,
			client_x509_cert_url = credentials.ClientX509CertUrl,
			universe_domain = credentials.UniverseDomain
		};

		return JsonSerializer.Serialize(credentialsJson);
	}
}
