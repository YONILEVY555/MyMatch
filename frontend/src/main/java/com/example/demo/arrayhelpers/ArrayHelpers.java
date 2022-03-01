package com.example.demo.arrayhelpers;

import java.util.HashSet;
import java.util.Set;

public final class ArrayHelpers {

    public static <T> Set<T> mergeSet(Set<T> a, Set<T> b)
    {

        Set<T> mergedSet = new HashSet<T>();

        mergedSet.addAll(a);
        mergedSet.addAll(b);

        return mergedSet;
    }
	
}
