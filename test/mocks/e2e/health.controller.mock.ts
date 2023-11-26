export class MockHttpHealthIndicator {
    pingCheck(key: string, url: string) {
        return Promise.resolve({
            [key]: { status: 'up', message: `Mocked response for ${url}` },
        });
    }
}
