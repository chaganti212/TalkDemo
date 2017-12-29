using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Repository_WebAPI.Models;
using System.IO;
using Newtonsoft.Json;

namespace Repository_WebAPI.Models
{
    public class TalkRepository : Repository<Talk>
    {
        public IEnumerable<Talk> SelectAll
        {
            get
            {
                var json = File.ReadAllText("c:\\users\\ammu\\documents\\visual studio 2015\\Projects\\Repository_WebAPI\\Repository_WebAPI\\Data\\talk.json");
                var json1 = JsonConvert.DeserializeObject<IEnumerable<Talk>>(json);
                return json1;
            }
        }

        public void Insert(Talk Talks)
        {
            var json = File.ReadAllText("c:\\users\\ammu\\documents\\visual studio 2015\\Projects\\Repository_WebAPI\\Repository_WebAPI\\Data\\talk.json");
            var json1 = JsonConvert.DeserializeObject<List<Talk>>(json);
            json1.Add(Talks);
            string jdata = JsonConvert.SerializeObject(json1);
            File.WriteAllText("c:\\users\\ammu\\documents\\visual studio 2015\\Projects\\Repository_WebAPI\\Repository_WebAPI\\Data\\talk.json", jdata);
        }

        public void Update(Talk Talks)
        {
            var json = File.ReadAllText("c:\\users\\ammu\\documents\\visual studio 2015\\Projects\\Repository_WebAPI\\Repository_WebAPI\\Data\\talk.json");
            var json1 = JsonConvert.DeserializeObject<List<Talk>>(json);
            var result= json1.FirstOrDefault(i => i.id == Talks.id);
            result.Name = Talks.Name;
            result.Speaker = Talks.Speaker;
            result.Venue = Talks.Venue;
            result.Duration = Talks.Duration;
            string jdata = JsonConvert.SerializeObject(json1);
            File.WriteAllText("c:\\users\\ammu\\documents\\visual studio 2015\\Projects\\Repository_WebAPI\\Repository_WebAPI\\Data\\talk.json", jdata);
        }

        




        //Talk Repository<Talk>.SelectById(int id)
        //{
        //    var json = File.ReadAllText("Data/talk.json");
        //    Talk json1 = JsonConvert.DeserializeObject<Talk>(json);
        //    var result = (from r in json1 where r.Id == id select r).FirstOrDefault();
        //    return result;
        //}
    }
}