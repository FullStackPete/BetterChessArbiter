namespace bcaAPI.Entities
{
    public class User
    {       
        public string Name { get; set; }    
        public string Email { get; set; }
        public string Password { get; set; }
        public Boolean EmailConfirmed { get; set; }
        public string Role { get; set; }

    }
}
