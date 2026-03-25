type ApiStatus = "ok" | "error";

function logLine(message: string): void {
    console.log(message);
}

// any: legacy logger that accepts literally anthing (no type safety)
function legacyLog(data: any): void {
    logLine("[Legacy] " + JSON.stringify(data));
}

// Unknown: external input (network/ user/ file) should be unknown
function parseApiResponse(input: unknown): { status: ApiStatus; payload?: string; error?: string } {
  // We must check before using unknown
  if (typeof input !== "object" || input === null) {
    return { status: "error", error: "Response is not an object" };
  }

  const obj = input as Record<string, unknown>;

  const status = obj["status"];
  if (status !== "ok" && status !== "error") {
    return { status: "error", error: "Invalid status value" };
  }

  if (status === "ok") {
    const payload = obj["payload"];
    if (typeof payload !== "string") {
      return { status: "error", error: "payload must be a string" };
    }
    return { status: "ok", payload };
  } else {
    const error = obj["error"];
    if (typeof error !== "string") {
      return { status: "error", error: "error must be a string" };
    }
    return { status: "error", error };
  }
}


// never: helper for "this should be impossible"
function assertNever(x: never): never {
  throw new Error("Unhandled case: " + String(x));
}

// Uses never via exhaustive checking
function handleStatus(status: ApiStatus): void {
  switch (status) {
    case "ok":
      logLine("Everything fine");
      return;
    case "error":
      logLine("Something went wrong");
      return;
    default:
      // If ApiStatus ever gets a new value and you forget to handle it,
      // TS will error here (because status won't be never)
      assertNever(status);
  }
}

const incoming: unknown = JSON.parse(
Math.random() > 0.5? '{"status":"ok","payload":"Hello!"}' : '{"status":"error","error":"Bad request"}'
);

legacyLog({ received: incoming }); // any

const parsed = parseApiResponse(incoming); // unknown -> checked -> safe object
legacyLog(parsed); // any again

handleStatus(parsed.status); 
if (parsed.status === "ok") {
    logLine("Payload: " + parsed.payload); // void
} else {
  logLine("Error: " + parsed.error); // void
}

