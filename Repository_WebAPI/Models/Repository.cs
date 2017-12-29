using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository_WebAPI.Models
{
    public interface Repository<T> where T:Talk
    {
        IEnumerable<T> SelectAll { get; }
        //T SelectById(int id);
        void Insert(T Talk);
        void Update(T Talk);
    }
}
