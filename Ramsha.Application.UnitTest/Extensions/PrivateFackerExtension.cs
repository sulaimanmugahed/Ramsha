using Bogus;

namespace Ramsha.Application.UnitTest.Extensions;
public static class PrivateFackerExtension
{
	public static Faker<T> UsePrivateConstractor<T>(this Faker<T> faker) where T : class
	{
		return faker.CustomInstantiator(f => Activator.CreateInstance(typeof(T), nonPublic: true) as T);
	}

}
