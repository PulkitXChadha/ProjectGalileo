import React, { useState, useEffect } from "react";
import * as d3 from "d3";

const UnifiedProfileGraph = (props) => {
  useEffect(() => {
    drawChart();
  });

  async function HierarchyToForcelayout(root, groups, values) {
    //Change if you want.
    groups = groups || "depth";
    values = values || "size";

    console.log(`root ${JSON.stringify(root)}`);
    // Make ierarchy structure.
    var test = d3.hierarchy(root);
    console.log(`Test ${JSON.stringify(test)}`);
    var forcejson = { nodes: [], links: [] };

    //Get index for links target and source.
    var name_index = {};
    test.forEach(function (d, i) {
      name_index[d.name] = i;
    });

    // Construct nodes and links for force layout.
    test.forEach(function (d, i) {
      var temp_node = { name: d.name, group: d[groups] };

      forcejson.nodes.push(temp_node);

      if (d.children) {
        d.children.forEach(function (c) {
          var temp_link = {
            source: i,
            target: name_index[c.name],
            value: c[values],
          };

          forcejson.links.push(temp_link);
        });
      }
    });

    return forcejson;
  }

  async function drawChart() {
    var profile = props.profile;

    // console.log(`Transformed data = ${HierarchyToForcelayout(profile)}`);
    // var computedLinks = d3.layout.links(computedNodes);
    // console.log(`computedNodes = ${JSON.stringify(computedNodes)}`);
    // console.log(`computedLinks = ${computedLinks}`);

    var baseNodes = [
      { id: "profile", group: 0, label: "Profile", level: 1 },

      { id: "sources", group: 0, label: "Sources", level: 2 },
      {
        id: "segmentMembership",
        group: 0,
        label: "SegmentMembership",
        level: 2,
      },
      { id: "identityMap", group: 0, label: "IdentityMap", level: 2 },

      {
        id: "profile-streaming-segment",
        group: 0,
        label: "Profile Streaming Segment",
        level: 3,
      },
      {
        id: "5e5f7cd52e2c6e18a8c2b751",
        group: 0,
        label: "5e5f7cd52e2c6e18a8c2b751",
        level: 3,
      },
      { id: "segments", group: 0, label: "segments", level: 3 },
      {
        id: "5e5d9b7a57f3f318a8b58db6",
        group: 0,
        label: "5e5d9b7a57f3f318a8b58db6",
        level: 3,
      },

      { id: "AAMTraits", group: 0, label: "AAMTraits", level: 3 },
      { id: "ups", group: 0, label: "UPS", level: 3 },

      { id: "ecid", group: 0, label: "ECID", level: 3 },
      { id: "crmid", group: 0, label: "CRM-ID", level: 3 },
      { id: "email", group: 0, label: "Email", level: 3 },

      { id: "16371055", group: 0, label: "16371055", level: 4 },

      {
        id: "bd97d6fc-db84-4e54-830b-d4dea61ae0c4",
        group: 0,
        label: "bd97d6fc-db84-4e54-830b-d4dea61ae0c4",
        level: 4,
      },
      {
        id: "ea341a93-caa9-403c-bc14-15d0f1705539",
        group: 0,
        label: "ea341a93-caa9-403c-bc14-15d0f1705539",
        level: 4,
      },
      {
        id: "46c83ac7-49db-42c7-be70-fc483f1706bc",
        group: 0,
        label: "46c83ac7-49db-42c7-be70-fc483f1706bc",
        level: 4,
      },
      {
        id: "d4b22e3e-2c2c-4dcd-8fe2-c51b2e00ca6d",
        group: 0,
        label: "d4b22e3e-2c2c-4dcd-8fe2-c51b2e00ca6d",
        level: 4,
      },

      {
        id: "66194050600923000994037391437411688368",
        group: 0,
        label: "66194050600923000994037391437411688368",
        level: 4,
      },
      {
        id: "03925647258972025124515159732770686831",
        group: 0,
        label: "03925647258972025124515159732770686831",
        level: 4,
      },
      {
        id: "19508588145508714991461998636652599186",
        group: 0,
        label: "19508588145508714991461998636652599186",
        level: 4,
      },
      {
        id: "89347512730821294271958072243123747891",
        group: 0,
        label: "89347512730821294271958072243123747891",
        level: 4,
      },
      {
        id: "46265923691160222460880843794668984835",
        group: 0,
        label: "46265923691160222460880843794668984835",
        level: 4,
      },

      { id: "6597179", group: 0, label: "6597179", level: 4 },

      {
        id: "william_schmidt@insightb.com",
        group: 0,
        label: "william_schmidt@insightb.com",
        level: 4,
      },
    ];

    var baseLinks = [
      { target: "profile", source: "sources", strength: 0.1 },
      { target: "profile", source: "segmentMembership", strength: 0.1 },
      { target: "profile", source: "identityMap", strength: 0.1 },

      { target: "sources", source: "profile-streaming-segment", strength: 0.1 },
      { target: "sources", source: "5e5f7cd52e2c6e18a8c2b751", strength: 0.1 },
      { target: "sources", source: "segments", strength: 0.1 },
      { target: "sources", source: "5e5d9b7a57f3f318a8b58db6", strength: 0.1 },

      { target: "segmentMembership", source: "AAMTraits", strength: 0.1 },
      { target: "segmentMembership", source: "ups", strength: 0.1 },

      { target: "identityMap", source: "ecid", strength: 0.1 },
      { target: "identityMap", source: "crmid", strength: 0.1 },
      { target: "identityMap", source: "email", strength: 0.1 },

      { target: "AAMTraits", source: "16371055", strength: 0.1 },

      {
        target: "ups",
        source: "bd97d6fc-db84-4e54-830b-d4dea61ae0c4",
        strength: 0.1,
      },
      {
        target: "ups",
        source: "ea341a93-caa9-403c-bc14-15d0f1705539",
        strength: 0.1,
      },
      {
        target: "ups",
        source: "46c83ac7-49db-42c7-be70-fc483f1706bc",
        strength: 0.1,
      },
      {
        target: "ups",
        source: "d4b22e3e-2c2c-4dcd-8fe2-c51b2e00ca6d",
        strength: 0.1,
      },

      {
        target: "ecid",
        source: "66194050600923000994037391437411688368",
        strength: 0.1,
      },
      {
        target: "ecid",
        source: "03925647258972025124515159732770686831",
        strength: 0.1,
      },
      {
        target: "ecid",
        source: "19508588145508714991461998636652599186",
        strength: 0.1,
      },
      {
        target: "ecid",
        source: "89347512730821294271958072243123747891",
        strength: 0.1,
      },
      {
        target: "ecid",
        source: "46265923691160222460880843794668984835",
        strength: 0.1,
      },

      { target: "crmid", source: "6597179", strength: 0.1 },

      {
        target: "email",
        source: "william_schmidt@insightb.com",
        strength: 0.1,
      },
    ];

    var nodes = [...baseNodes];
    var links = [...baseLinks];

    function getNeighbors(node) {
      return baseLinks.reduce(
        function (neighbors, link) {
          if (link.target.id === node.id) {
            neighbors.push(link.source.id);
          } else if (link.source.id === node.id) {
            neighbors.push(link.target.id);
          }
          return neighbors;
        },
        [node.id]
      );
    }

    function isNeighborLink(node, link) {
      return link.target.id === node.id || link.source.id === node.id;
    }

    function getNodeColor(node, neighbors) {
      if (Array.isArray(neighbors) && neighbors.indexOf(node.id) > -1) {
        return node.level === 1 ? "blue" : "green";
      }

      return node.level === 1 ? "red" : "gray";
    }

    function getLinkColor(node, link) {
      return isNeighborLink(node, link) ? "green" : "#E5E5E5";
    }

    function getTextColor(node, neighbors) {
      return Array.isArray(neighbors) && neighbors.indexOf(node.id) > -1
        ? "green"
        : "black";
    }

    var width = 1400;
    var height = 900;

    if (document.getElementById("graph").innerHTML !== "") {
      return;
    }
    var svg = d3
      .select("#graph")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    var linkElements, nodeElements, textElements;

    // we use svg groups to logically group the elements together
    var linkGroup = svg.append("g").attr("class", "links");
    var nodeGroup = svg.append("g").attr("class", "nodes");
    var textGroup = svg.append("g").attr("class", "texts");

    // we use this reference to select/deselect
    // after clicking the same element twice
    var selectedId;

    // simulation setup with all forces
    var linkForce = d3
      .forceLink()
      .id(function (link) {
        return link.id;
      })
      .strength(function (link) {
        return link.strength;
      });

    var simulation = d3
      .forceSimulation()
      .force("link", linkForce)
      .force("charge", d3.forceManyBody().strength(-120))
      .force("center", d3.forceCenter(width / 2, height / 2));

    var dragDrop = d3
      .drag()
      .on("start", function (node) {
        node.fx = node.x;
        node.fy = node.y;
      })
      .on("drag", function (node) {
        simulation.alphaTarget(0.7).restart();
        node.fx = d3.event.x;
        node.fy = d3.event.y;
      })
      .on("end", function (node) {
        if (!d3.event.active) {
          simulation.alphaTarget(0);
        }
        node.fx = null;
        node.fy = null;
      });

    // select node is called on every click
    // we either update the data according to the selection
    // or reset the data if the same node is clicked twice
    function selectNode(selectedNode) {
      if (selectedId === selectedNode.id) {
        selectedId = undefined;
        //   resetData();
        updateSimulation();
      } else {
        selectedId = selectedNode.id;
        //   updateData(selectedNode);
        updateSimulation();
      }

      var neighbors = getNeighbors(selectedNode);

      // we modify the styles to highlight selected nodes
      nodeElements.attr("fill", function (node) {
        return getNodeColor(node, neighbors);
      });
      textElements.attr("fill", function (node) {
        return getTextColor(node, neighbors);
      });
      linkElements.attr("stroke", function (link) {
        return getLinkColor(selectedNode, link);
      });
    }

    // this helper simple adds all nodes and links
    // that are missing, to recreate the initial state
    function resetData() {
      var nodeIds = nodes.map(function (node) {
        return node.id;
      });

      baseNodes.forEach(function (node) {
        if (nodeIds.indexOf(node.id) === -1) {
          nodes.push(node);
        }
      });

      links = baseLinks;
    }

    // diffing and mutating the data
    function updateData(selectedNode) {
      var neighbors = getNeighbors(selectedNode);
      var newNodes = baseNodes.filter(function (node) {
        return neighbors.indexOf(node.id) > -1 || node.level === 1;
      });

      var diff = {
        removed: nodes.filter(function (node) {
          return newNodes.indexOf(node) === -1;
        }),
        added: newNodes.filter(function (node) {
          return nodes.indexOf(node) === -1;
        }),
      };

      diff.removed.forEach(function (node) {
        nodes.splice(nodes.indexOf(node), 1);
      });
      diff.added.forEach(function (node) {
        nodes.push(node);
      });

      links = baseLinks.filter(function (link) {
        return (
          link.target.id === selectedNode.id ||
          link.source.id === selectedNode.id
        );
      });
    }

    function updateGraph() {
      // links
      linkElements = linkGroup.selectAll("line").data(links, function (link) {
        return link.target.id + link.source.id;
      });

      linkElements.exit().remove();

      var linkEnter = linkElements
        .enter()
        .append("line")
        .attr("stroke-width", 1)
        .attr("stroke", "rgba(50, 50, 50, 0.2)");

      linkElements = linkEnter.merge(linkElements);

      // nodes
      nodeElements = nodeGroup.selectAll("circle").data(nodes, function (node) {
        return node.id;
      });

      nodeElements.exit().remove();

      var nodeEnter = nodeElements
        .enter()
        .append("circle")
        .attr("r", 10)
        .attr("fill", function (node) {
          return node.level === 1 ? "red" : "gray";
        })
        .call(dragDrop)
        // we link the selectNode method here
        // to update the graph on every click
        .on("click", selectNode);

      nodeElements = nodeEnter.merge(nodeElements);

      // texts
      textElements = textGroup.selectAll("text").data(nodes, function (node) {
        return node.id;
      });

      textElements.exit().remove();

      var textEnter = textElements
        .enter()
        .append("text")
        .text(function (node) {
          return node.label;
        })
        .attr("font-size", 15)
        .attr("dx", 15)
        .attr("dy", 4);

      textElements = textEnter.merge(textElements);
    }

    function updateSimulation() {
      updateGraph();

      simulation.nodes(nodes).on("tick", () => {
        nodeElements
          .attr("cx", function (node) {
            return node.x <= width ? (node.x >= 0 ? node.x : 0) : width;
          })
          .attr("cy", function (node) {
            return node.y <= height ? (node.y >= 0 ? node.y : 0) : height;
          });
        textElements
          .attr("x", function (node) {
            return node.x <= width ? (node.x >= 0 ? node.x : 0) : width;
          })
          .attr("y", function (node) {
            return node.y <= height ? (node.y >= 0 ? node.y : 0) : height;
          });
        linkElements
          .attr("x1", function (link) {
            return link.source.x <= width
              ? link.source.x >= 0
                ? link.source.x
                : 0
              : width;
          })
          .attr("y1", function (link) {
            return link.source.y <= height
              ? link.source.y >= 0
                ? link.source.y
                : 0
              : height;
          })
          .attr("x2", function (link) {
            return link.target.x <= width
              ? link.target.x >= 0
                ? link.target.x
                : 0
              : width;
          })
          .attr("y2", function (link) {
            return link.target.y <= height
              ? link.target.y >= 0
                ? link.target.y
                : 0
              : height;
          });
      });

      simulation.force("link").links(links);
      simulation.alphaTarget(0.7).restart();
    }

    // last but not least, we call updateSimulation
    // to trigger the initial render
    updateSimulation();
  }

  return <div id="graph"></div>;
};

export default UnifiedProfileGraph;
