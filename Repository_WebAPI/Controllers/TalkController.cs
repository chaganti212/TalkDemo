using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Repository_WebAPI.Models;
using System.IO;
using Newtonsoft.Json;
using System.Web.Http.Cors;

namespace Repository_WebAPI.Controllers
{
    //[EnableCors(origins: "*", headers: "*", methods: "*")]
    public class TalkController : ApiController
    {
        public IEnumerable<Talk> gettalk()
        {
            TalkRepository obj = new TalkRepository();
            return obj.SelectAll;
        }

        public void postjdata(Talk talks)
        {
            TalkRepository obj = new TalkRepository();
            obj.Insert(talks);
        }
        public void putjdata(Talk talks)
        {
            TalkRepository obj = new TalkRepository();
            obj.Update(talks);
        }
    }
}
