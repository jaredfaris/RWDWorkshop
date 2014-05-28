using System.Collections.Generic;
using System.Web.Http;

namespace MVC_Knockout.APIs
{
    public class DataController : ApiController
    {
        private static IEnumerable<SelectValue> _selectValues;

        private DataController()
        {
            if (_selectValues == null)
            {
                _selectValues = new List<SelectValue>
                {
                    new SelectValue {Value = 1, Name = "Value 1", Selected = false},
                    new SelectValue {Value = 2, Name = "Value 2", Selected = false},
                    new SelectValue {Value = 3, Name = "Value 3", Selected = false},
                    new SelectValue {Value = 4, Name = "Value 4", Selected = true},
                    new SelectValue {Value = 5, Name = "Value 5", Selected = true},
                    new SelectValue {Value = 6, Name = "Value 6", Selected = true},
                };
            }
        }

        public IEnumerable<SelectValue> Get()
        {
            return _selectValues;
        }

        [HttpPost]
        public void Update(IEnumerable<SelectValue> newValues)
        {
            _selectValues = newValues;
        }

        public class SelectValue
        {
            public int Value { get; set; }
            public string Name { get; set; }
            public bool Selected { get; set; }
        }
    }
}