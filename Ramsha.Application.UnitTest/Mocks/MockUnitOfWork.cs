using Ramsha.Application.Contracts;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ramsha.Application.UnitTest.Mocks;
public static class MockUnitOfWork
{
	public static Mock<IUnitOfWork> GetUnitOfWork() => new Mock<IUnitOfWork>();
}
