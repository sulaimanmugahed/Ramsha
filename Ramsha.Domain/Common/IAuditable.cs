

namespace Ramsha.Domain.Common;


public interface IAuditable 
{
    public Guid CreatedBy { get; set; }
    public DateTime Created { get; set; }
    public Guid? LastModifiedBy { get; set; }
    public DateTime? LastModified { get; set; }

    public void Create(Guid userId)
    {
        CreatedBy = userId;
        Created = DateTime.UtcNow;
    }

    public void Update(Guid userId)
    {
        LastModifiedBy = userId;
        LastModified = DateTime.UtcNow;
    }
  
}
