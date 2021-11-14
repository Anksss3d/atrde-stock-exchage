from django.http import HttpResponse
from django.http import JsonResponse

from .models import Company, History, Tweet, Training, Stock
from.ml_model import get_prediction


# Create your views here.
def index(request):
    return HttpResponse("Hello, Welcome to our Trading app.")


def get_stock_history(request, symbol, dtype):
    start_date = None
    end_date = None
    if "start_date" in request.GET:
        start_date = request.GET["start_date"]
    if "end_date" in request.GET:
        end_date = request.GET["end_date"]

    company = Company.objects.filter(symbol=symbol).first()
    records = History.objects.filter(company=company, dtype=dtype)
    if start_date:
        records = records.filter(timestamp__gt=start_date+" 00:00:00")
    if end_date:
        records = records.filter(timestamp__lt=end_date+"23:59:59")
    records.order_by('timestamp')
    records = list(reversed(list(records.values())))[:50]
    records = list(reversed(records))
    _open = []
    _close = []
    _high = []
    _low = []
    _volume = []
    _date = []
    for record in records:
        _open.append(round(record["open"], 2))
        _close.append(round(record["close"], 2))
        _high.append(round(record["high"], 2))
        _low.append(round(record["low"], 2))
        _volume.append(record["volume"])
        if dtype=="15m":
            _date.append(record["timestamp"])
        else:
            _date.append(record["timestamp"][:10])

    obj = {
        "dates": _date,
        "high": _high,
        "low": _low,
        "open": _open,
        "close": _close,
        "volume": _volume
    }

    # records = records[]
    return JsonResponse(obj, safe=False)


def get_user_data(request):
    email = request.GET['email']
    stocks = Stock.objects.filter(user_email=email)
    comps, counts, prices = {}, {}, {}
    for stock in stocks:
        if stock.company.symbol in comps:
            counts[stock.company.symbol] += stock.count
            prices[stock.company.symbol] += stock.count * stock.buying_price
        else:
            comps[stock.company.symbol] = stock.company.name
            counts[stock.company.symbol] = stock.count
            prices[stock.company.symbol] = stock.count * stock.buying_price

    ans = []
    for key in comps:
        obj = {
            "company_symbol": key,
            "company_name": comps[key],
            "stocks_count": counts[key],
            "total value": prices[key]
        }
        ans.append(obj)
    return JsonResponse(ans, safe=False)


def buy_stock(request):
    try:
        user_email = request.GET['email']
        company_symbol = request.GET['symbol']
        count = request.GET['count']
        buying_price = request.GET['buying_price']

        stock = Stock(user_email=user_email, company=Company.objects.filter(symbol=company_symbol).first(), count=count, buying_price=buying_price)
        stock.save()
        msg = {
            "flag":True
        }

    except Exception as e:
        msg = {
            "flag": False,
            "error": str(e)
        }

    return JsonResponse(msg)

def find_prediction(request, symbol):
    company = Company.objects.filter(symbol=symbol).first()
    records = History.objects.filter(company=company, dtype='1d')
    records.order_by('timestamp')
    stocks = list(reversed(list(records.values())))[:20]
    stocks = [[stock["close"]] for stock in stocks]
    pred = get_prediction(stocks)
    if stocks[-1] > pred:
        msg =  {
            "prediction": "Sell",
            "value": pred
        }
    else:
        msg =  {
            "prediction": "Buy",
            "value": pred
        }
    return JsonResponse(msg)


def add_companies(request):
    cnt = 0
    """
    company = Company(symbol="TSLA", name="Tesla Inc", country="United States")
    company.save()

    History.objects.filter(company=company).delete()

    companies = ["tsla"]
    dtypes = ["15m", "1d", "1wk", "1mo"]
    intervals = ["1mo", "5y", "5y", "10y"]
    for company in companies:
        comp = Company.objects.filter(symbol=company.upper()).first()
        for dtype, interval in zip(dtypes, intervals):
            file_name = company + "_" + dtype + "_" + interval + ".json"
            fp = open("stocks_data/"+file_name, )
            json_file = json.loads(fp.read())
            obj = json_file["chart"]["result"][0]
            timestamps = obj["timestamp"]
            _open = obj["indicators"]["quote"][0]["open"]
            _high = obj["indicators"]["quote"][0]["high"]
            _low = obj["indicators"]["quote"][0]["low"]
            _close = obj["indicators"]["quote"][0]["close"]
            _volume = obj["indicators"]["quote"][0]["volume"]

            for ts, opens, close, high, low, volume in zip(timestamps, _open, _close, _high, _low, _volume):
                history = History(
                    timestamp=str(datetime.datetime.fromtimestamp(ts)),
                    open = opens,
                    close = close,
                    low = low,
                    high = high,
                    volume = volume,
                    company=comp,
                    dtype=dtype,
                )
                history.save()
                cnt += 1

    

    #Code to Add Sentiments to the system.

    companies = ["TSLA", "GOOGL", "FB"]
    counts = ["1", "2", "3"]
    Tweet.objects.all().delete()
    for company in companies:
        comp = Company.objects.filter(symbol=company).first()
        for count in counts:
            file_name = company.lower() + count + ".json"
            fp = open("tweets_data/" + file_name, )
            json_file = json.loads(fp.read())
            for obj in json_file:
                tweet = Tweet(company=comp, tweet="", timestamp=obj["timestamp"], polarity=obj["polarity"])
                tweet.save()
                cnt += 1
    

    Training.objects.all().delete()
    company = Company.objects.filter(symbol="GOOGL").first()
    history = History.objects.filter(company=company, dtype="1d", timestamp__gt="2018-12-01 00:00:00").order_by("timestamp")
    for h in history:
        dt = datetime.datetime.fromisoformat(h.timestamp)
        prev_date = dt - datetime.timedelta(days=3)
        tweets = Tweet.objects.filter(company=company, timestamp__gt=str(prev_date), timestamp__lte=str(dt))
        avg = sum([x.polarity for x in tweets])/(len(tweets)+0.0001)
        tr = Training(timestamp=str(dt), polarity=avg, close=h.close)
        tr.save()
        cnt += 1
        if cnt % 25 == 0:
            print("done: ", cnt)

    """
    json_msg = {
        "msg": "completed",
        "Number of records": cnt
    }
    return JsonResponse(json_msg, safe=False)

