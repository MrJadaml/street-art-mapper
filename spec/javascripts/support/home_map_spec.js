describe('Home Map', function() {
  beforeEach(function() {
    jasmine.createSpy('google')
    // spyOn(google, "maps").and.returnValue({LatLng: function(){}})

    loadFixtures('map.html')
  });

  it("calls activePin on a mouseover of .galleryImg", function() {
    spyOn(window, "activePin");
    $('.galleryImg').trigger("mouseover");
    expect(window.activePin).toHaveBeenCalled();
  });
});
