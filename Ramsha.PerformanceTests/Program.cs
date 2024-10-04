

using System.Linq.Expressions;
using System.Reflection;




var user = new User();

List<User> list = [
    new (){
        Age = 1,
        Name="ali"
    },
    new (){
        Age = 2,
        Name="sad"
    },
];


var prop = user.GetType().GetProperty("Age");



var param = Expression.Parameter(typeof(User), "user");

var propExp = Expression.Property(param, prop);

var con = Expression.Constant(1, typeof(int));

var body = Expression.Equal(propExp ,con);

var lampda = Expression.Lambda<Func<User, bool>>(
    body,
    param
);

//lampda.p();

var compiled = lampda.Compile();
//compiled.p();

var test = list.Where(compiled);

//test.p();

foreach (var Age in test)
{
    // Age.p();
    Console.WriteLine($"age {Age.Name}");
}









//exp.p();


class User
{
    public int Age { get; set; }
    public string Name { get; set; }

}





public static class o
{
    public static void p(this object obj)
    {
        if (obj == null)
        {
            Console.WriteLine("null");
            return;
        }

        Type type = obj.GetType();
        Console.WriteLine($"Type: {type.FullName}");
        foreach (PropertyInfo property in type.GetProperties(BindingFlags.Public | BindingFlags.Instance))
        {
            Console.WriteLine($"{property.Name}: {property.GetValue(obj)}");
        }
        foreach (FieldInfo field in type.GetFields(BindingFlags.Public | BindingFlags.Instance))
        {
            Console.WriteLine($"{field.Name}: {field.GetValue(obj)}");
        }
    }
}
