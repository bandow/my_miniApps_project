module.exports = 
{
    getInstance:getInstance
}

var baseRQ = require('BaseRQ.js');


function getInstance()
{
    var instance =
    {
        create:function(MemberNo,CouponCodes,CouponState,HotelId,Channel,OrderId,RentType,BrandCode,ActId,StartDate,EndDate,NeedDetail,CouponType,Expire)
        {
            var request = baseRQ.getInstance().create();
            request.MemberNo = MemberNo;
            request.CouponCodes = CouponCodes;
            request.CouponState = CouponState;
            request.HotelId = HotelId;
            request.Channel = Channel;
            request.OrderId = OrderId;
            request.RentType = RentType;
            request.BrandCode = BrandCode;
            request.ActId = ActId;
            request.StartDate = StartDate;
            request.EndData = EndDate;
            request.NeedDetail = NeedDetail;
            request.CouponType =CouponType;
            request.Expire = Expire;
            return request;
        }
    }
    return instance;
}