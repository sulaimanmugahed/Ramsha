using Ramsha.Domain.Common;

namespace Ramsha.Domain.DeliveryAgents;

public record DeliveryAgentId(Guid Value);

public class DeliveryAgent : BaseEntity, IAuditable, ISoftDeletable, IUser
{

    private DeliveryAgent(DeliveryAgentId id, string username, string firstName, string lastName)
    {
        Id = id;
        Username = username;
        FirstName = firstName;
        LastName = lastName;
    }


    public static DeliveryAgent Create(string username, string firstName, string lastName)
    {
        return new(
            new DeliveryAgentId(Guid.NewGuid()), username, firstName, lastName);
    }


    public DeliveryAgentId Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Username { get; set; }
    public Guid CreatedBy { get; set; }
    public DateTime Created { get; set; }
    public Guid? LastModifiedBy { get; set; }
    public DateTime? LastModified { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime? Deleted { get; set; }
    public Guid? DeletedBy { get; set; }
}
