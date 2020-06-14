import base64
import hmac
import struct
import sys
import time


def hotp(key, counter, digits=10, digest='sha512'):
    key = base64.b32decode(key.upper() + '=' * ((8 - len(key)) % 8))
    counter = struct.pack('>Q', counter)
    mac = hmac.new(key, counter, digest).digest()
    offset = mac[-1] & 0x0f
    binary = struct.unpack('>L', mac[offset:offset+4])[0] & 0x7fffffff
    return str(binary)[-digits:].rjust(digits, '0')


def totp(key, time_step=30, digits=10, digest='sha512'):
    return hotp(key, int(time.time() / time_step), digits, digest)


def main():
    args = [int(x) if x.isdigit() else x for x in sys.argv[1:]]
    for key in sys.stdin:
        print(totp(key.strip(), *args))


if __name__ == '__main__':
    main()
