using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ramsha.Domain.Common;

public class CompositeKey
{
    public object[] Keys { get; }

    public CompositeKey(params object[] keys)
    {
        Keys = keys;
    }

    // Optionally, override Equals and GetHashCode for proper comparisons
    public override bool Equals(object obj)
    {
        if (obj is not CompositeKey other) return false;
        return Keys.SequenceEqual(other.Keys);
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(Keys);
    }
}


