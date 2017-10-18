function handler_get(req, res) {
  res.json(compose_ip_response(extract_ip(req)))
}

function compose_ip_response(ip) {
  return {ip}
}

function extract_ip(req) {
  return req.connection.remoteAddress
}

function examineIp(ip) {
  if (typeof(ip) !== 'string') {
    return false
  }

  let segments = ip.split('.')

  if (segments.length !== 4) {
    return false
  }

  for(let val of segments) {
    let nVal = Number(val)
    if (
      val.length == 0 ||
      isNaN(nVal) ||
      !Number.isInteger(nVal) ||
      nVal < 0 ||
      nVal > 255
    ) {
      return false
    }

    if (val.length >= 2 && val[0] == '0') {
      return false
    }
  }

  return true
}

module.exports = {
  handler_get,
  compose_ip_response,
  extract_ip,
  examineIp,
}
