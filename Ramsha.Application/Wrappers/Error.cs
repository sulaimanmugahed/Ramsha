﻿namespace Ramsha.Application.Wrappers;

public class Error
{
    public Error(ErrorCode errorCode, string description = null, string fieldName = null)
    {
        ErrorCode = errorCode;
        Description = description;
        FieldName = fieldName;
    }

    public Error(ErrorCode errorCode, string message, string[] parameters)
    {
    }

    public ErrorCode ErrorCode { get; set; }
    public string FieldName { get; set; }
    public string Description { get; set; }
}
