using FluentValidation;


namespace Ramsha.Application.Features.Products.Commands;

public class IProductCommandValidator : AbstractValidator<IProductCommand>
{
    public IProductCommandValidator()
    {
        RuleFor(p => p.Name)
            .NotNull()
            .WithMessage("name can't null")
            .NotEmpty()
            .WithMessage("name can't empty");
        

        RuleFor(p => p.Description)
            .NotEmpty()
            .NotNull();

        RuleFor(p => p.Price)
            .NotNull();

    }
}
