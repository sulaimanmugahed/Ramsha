using FluentAssertions;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Features.Products.Commands.CreateProduct;
using Ramsha.Application.UnitTest.Mocks;
using Moq;


namespace Ramsha.Application.UnitTest.Features.Products.Commands;
public class CreateProductCommandHandlerTests
{
	private readonly Mock<IProductRepository> _mockProductRepo;
	private readonly Mock<IUnitOfWork> _mockUnitOfWork;
	private readonly CreateProdactCommandHandler _handler;
	public CreateProductCommandHandlerTests()
	{
		_mockProductRepo = MockProductRepository.GetProductRepository();
		_mockUnitOfWork = MockUnitOfWork.GetUnitOfWork();
		_handler = new CreateProdactCommandHandler(_mockProductRepo.Object, _mockUnitOfWork.Object);
	}


	[Fact]
	public async Task Handel_Should_ReturnExpectedResult_When_CreateProductCommandRequest()
	{
		// Arrange 
		var products = await _mockProductRepo.Object.GetAllAsync();


		// Act
		var result = await _handler.Handle(new CreateProductCommand()
		{
			Name = "test",
			Description = "test",
			Price = 500
		},
		CancellationToken.None);

		// Assert
		products.Count.Should().Be(6);
		result.Success.Should().BeTrue();
	}


}
