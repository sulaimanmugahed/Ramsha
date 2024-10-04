using Ramsha.Domain;

namespace Ramsha.Application.Contracts.Persistence;

public interface IStudentRepository
{
    List<Student> GetAll();
    Student Get(int id);
    bool Create(Student student);
    bool Delete(Student student);
    decimal GetFinalPrice();
}
