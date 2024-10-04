using System;
using System.Reflection;
public static class ObjectDumper
{
    public static void Dump(this object obj, int depth = 0)
    {
        if (obj == null)
        {
            Console.WriteLine(new string(' ', depth * 2) + "null");
            return;
        }

        Type type = obj.GetType();
        Console.WriteLine(new string(' ', depth * 2) + $"Type: {type.FullName}");

        // Dump properties
        Console.WriteLine(new string(' ', depth * 2) + "Properties:");
        foreach (PropertyInfo property in type.GetProperties(BindingFlags.Public | BindingFlags.Instance | BindingFlags.NonPublic))
        {
            try
            {
                var value = property.GetValue(obj);
                Console.WriteLine(new string(' ', (depth + 1) * 2) + $"{property.Name} ({property.PropertyType.Name}): {FormatValue(value, depth + 1)}");
            }
            catch (Exception ex)
            {
                Console.WriteLine(new string(' ', (depth + 1) * 2) + $"{property.Name} ({property.PropertyType.Name}): [Error: {ex.Message}]");
            }
        }

        // Dump fields
        Console.WriteLine(new string(' ', depth * 2) + "Fields:");
        foreach (FieldInfo field in type.GetFields(BindingFlags.Public | BindingFlags.Instance | BindingFlags.NonPublic))
        {
            try
            {
                var value = field.GetValue(obj);
                Console.WriteLine(new string(' ', (depth + 1) * 2) + $"{field.Name} ({field.FieldType.Name}): {FormatValue(value, depth + 1)}");
            }
            catch (Exception ex)
            {
                Console.WriteLine(new string(' ', (depth + 1) * 2) + $"{field.Name} ({field.FieldType.Name}): [Error: {ex.Message}]");
            }
        }
    }

    private static string FormatValue(object value, int depth)
    {
        if (value == null)
            return "null";

        Type type = value.GetType();
        if (type.IsClass && type != typeof(string))
        {
            // Avoid infinite loops and overly deep recursion
            if (depth > 3)
                return $"{type.Name} (nested)";

            // Capture output using StringWriter
            var sb = new System.Text.StringBuilder();
            var originalOut = Console.Out; // Save original console output
            using (var sw = new System.IO.StringWriter(sb))
            {
                Console.SetOut(sw);
                Dump(value, depth);
                Console.SetOut(originalOut); // Restore original console output
            }
            return sb.ToString().Trim();
        }

        return value.ToString();
    }
}