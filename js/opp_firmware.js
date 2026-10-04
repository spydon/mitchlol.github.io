$(function(){
    var base = "/Open-Pixel-Poi/firmware/";

    function installButton(manifest, label, style){
        var button = $("<esp-web-install-button></esp-web-install-button>").attr("manifest", base + manifest);
        button.append($("<button></button>").attr("slot", "activate").addClass("btn " + style).text(label));
        return button;
    }

    function showRelease(release){
        var row = $("#opp-release-variants").empty();
        $.each(release.variants, function(_, variant){
            var column = $("<div></div>").addClass("col-md-4");
            column.append($("<h5></h5>").addClass("header").text(variant.name));
            column.append($("<p></p>").append(installButton(variant.update, "Update", "btn-primary")));
            column.append($("<p></p>").append(installButton(variant.install, "Full install", "btn-default")));
            row.append(column);
        });
        $("#opp-release-date").text("Released " + release.date);
    }

    $.getJSON(base + "index.json").done(function(index){
        if(!index.releases || index.releases.length == 0){
            return;
        }
        var select = $("#opp-release-version").empty();
        $.each(index.releases, function(position, release){
            var label = release.version + (position == 0 ? " (latest)" : "");
            select.append($("<option></option>").val(position).text(label));
        });
        select.on("change", function(){
            showRelease(index.releases[select.val()]);
        });
        showRelease(index.releases[0]);
        $("#opp-static-releases").hide();
        $("#opp-dynamic-releases").show();
    });
});
