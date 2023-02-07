/*
Repeat and Retry HTTP Requests Using RxJS
https://netbasal.com/repeat-and-retry-http-requests-using-rxjs-423c1996fb65

Sometimes we have to perform a certain operation repeatedly over time, with a set period of time between runs. The most common examples are when we need to poll a server to determine whether the operation succeeded or auto-refresh a stale screen with new data.

We can use the 
repeat() operator utilizing the new delay option in v7.5.0. Suppose we want to display the latest metrics to our users every 30 seconds:

https://gist.github.com/NetanelBasal/1ec5526fbac8a6adc97f8eef6da463cc#file-repeat-1-ts
*/
import { repeat } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MetricsService {
  private http = inject(HttpClient);

  getMetrics() {
    return this.http.get('https://metrics')
      .pipe(
        repeat({ delay: 30_000 }),
      )
  }
}

/*
The source observable will repeat forever until explicitly destroyed, with a 30 seconds delay between repetitions. In addition, we can also use the count option, which is the number of times to repeat the source.

Let’s say we have a case where we perform some actions requiring polling from the server until we get the status completed:

https://gist.github.com/NetanelBasal/8baac19de444c51776c6b7cf191aa49b#file-repeat-2-ts
*/
import { repeat, filter, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FooService {
  private http = inject(HttpClient);

  doSometing(data) {
    return this.http.post('https://foo', data)
      .pipe(
        repeat({ delay: 1000 }),
        filter((res) => res.status === 'completed'),
        take(1)
      )
  }
}

/*
The delay option also accepts a function that provides the number of times the source has been subscribed to, with the return value being an observable input that indicates when the source should be repeated.

By selecting this option, we can set a delay that increases by one second after each repetition:

https://gist.github.com/NetanelBasal/ac7f6e3e6fe6ce935e72aade00f6a0f5#file-repeat-3-ts
*/

import { repeat, filter, take, timer } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FooService {
  private http = inject(HttpClient);

  doSometing(data) {
    return this.http.post('https://foo', data)
      .pipe(
        // 👇👇👇
        repeat({ delay: (count) => timer(count * 1000) }),
        filter((res) => res.status === 'completed'),
        take(1)
      )
  }
}

/*
The repeat() operator is useful when the source has been completed. We can use the retry() operator to handle errors. As of v7.3.0, we can use the delay option to handle retries with delay and implement exponential backoff quickly.

Exponential backoff is a standard error-handling strategy. In this approach, a client periodically retries a failed request with increasing delays between requests. Here are a few variations we can use:

https://gist.github.com/NetanelBasal/2b8f620a84bd5d7a15825d0bd608923c#file-repeat-4-ts
*/
import { repeat } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MetricsService {
  private http = inject(HttpClient);

  getMetrics() {
    return this.http.get('https://metrics')
      .pipe(
        repeat({ delay: 30_000 }),
        // 👇
        retry(3),
        // 👇
        retry({
          count: 3,
          delay: 1000
        }),
        // 👇
        retry({
          count: 3,
          delay: (error, count) => {
           // Retry forever, but with an exponential step-back
           // maxing out at 1 minute.
           return timer(Math.min(60000, 2 ^ count * 1000))
          },
        })
      )
  }
}