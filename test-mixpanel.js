// Test Mixpanel Implementation
// Paste this in your browser console to verify Mixpanel is working

console.log("🔍 Mixpanel Integration Test");
console.log("================================");

// 1. Check if Mixpanel is loaded
if (typeof window.mixpanel !== 'undefined') {
  console.log("✅ Mixpanel object exists on window");

  // 2. Check if it's initialized
  if (window.mixpanel.track && typeof window.mixpanel.track === 'function') {
    console.log("✅ Mixpanel track function is available");

    // 3. Send a test event
    try {
      window.mixpanel.track('Test Event', {
        source: 'console',
        timestamp: new Date().toISOString(),
      });
      console.log("✅ Test event sent successfully");
      console.log("   Check your Mixpanel dashboard Live View!");
    } catch (e) {
      console.error("❌ Error sending test event:", e);
    }
  } else {
    console.error("❌ Mixpanel track function not available");
  }

  // 4. Check configuration
  console.log("\n📊 Mixpanel Config:");
  console.log("   Token:", window.mixpanel.get_config('token'));
  console.log("   API Host:", window.mixpanel.get_config('api_host'));

} else {
  console.error("❌ Mixpanel not loaded on window object");
  console.log("   This is expected if using the official SDK in modules");
  console.log("   The tracking functions should still work!");
}

console.log("\n================================");
console.log("📍 Next Steps:");
console.log("1. Navigate through your site pages");
console.log("2. Click on navigation tabs");
console.log("3. Hover over products");
console.log("4. Click contact methods");
console.log("5. Check Mixpanel dashboard for events!");

